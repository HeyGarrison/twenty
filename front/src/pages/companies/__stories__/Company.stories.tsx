import { getOperationName } from '@apollo/client/utilities';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, within } from '@storybook/testing-library';
import { graphql } from 'msw';

import { GET_ACTIVITIES_BY_TARGETS, GET_ACTIVITY } from '@/activities/queries';
import { CREATE_ACTIVITY_WITH_COMMENT } from '@/activities/queries/create';
import { GET_COMPANY } from '@/companies/queries';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedActivities } from '~/testing/mock-data/activities';
import { mockedCompaniesData } from '~/testing/mock-data/companies';
import { getRenderWrapperForPage } from '~/testing/renderWrappers';

import { CompanyShow } from '../CompanyShow';

const meta: Meta<typeof CompanyShow> = {
  title: 'Pages/Companies/Company',
  component: CompanyShow,
};

export default meta;

export type Story = StoryObj<typeof CompanyShow>;

const companyShowCommonGraphqlMocks = [
  graphql.query(
    getOperationName(GET_ACTIVITIES_BY_TARGETS) ?? '',
    (req, res, ctx) => {
      return res(
        ctx.data({
          findManyActivitys: mockedActivities,
        }),
      );
    },
  ),
  graphql.query(getOperationName(GET_COMPANY) ?? '', (req, res, ctx) => {
    return res(
      ctx.data({
        findUniqueCompany: mockedCompaniesData[0],
      }),
    );
  }),
];

export const Default: Story = {
  render: getRenderWrapperForPage(
    <CompanyShow />,
    '/companies/89bb825c-171e-4bcc-9cf7-43448d6fb278',
  ),
  parameters: {
    msw: [...graphqlMocks, ...companyShowCommonGraphqlMocks],
  },
};

export const EditNote: Story = {
  render: getRenderWrapperForPage(
    <CompanyShow />,
    '/companies/89bb825c-171e-4bcc-9cf7-43448d6fb278',
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstNoteTitle = await canvas.findByText('My very first note');
    await firstNoteTitle.click();

    expect(
      await canvas.findByDisplayValue('My very first note'),
    ).toBeInTheDocument();

    const workspaceName = await canvas.findByText('Twenty');
    await fireEvent.click(workspaceName);

    expect(await canvas.queryByDisplayValue('My very first note')).toBeNull();

    const noteButton = await canvas.findByText('Note');
    await noteButton.click();

    expect(
      await canvas.findByDisplayValue('My very first note'),
    ).toBeInTheDocument();
  },
  parameters: {
    msw: [
      ...graphqlMocks,
      ...companyShowCommonGraphqlMocks,
      graphql.mutation(
        getOperationName(CREATE_ACTIVITY_WITH_COMMENT) ?? '',
        (req, res, ctx) => {
          return res(
            ctx.data({
              createOneActivity: mockedActivities[0],
            }),
          );
        },
      ),
      graphql.query(getOperationName(GET_ACTIVITY) ?? '', (req, res, ctx) => {
        return res(
          ctx.data({
            findManyActivitys: [mockedActivities[0]],
          }),
        );
      }),
    ],
  },
};
