import styled from '@emotion/styled';

import { NameField } from '@/settings/workspace/components/NameField';
import { WorkspaceLogoUploader } from '@/settings/workspace/components/WorkspaceLogoUploader';
import { SubMenuTopBarContainer } from '@/ui/layout/components/SubMenuTopBarContainer';
import { MainSectionTitle } from '@/ui/title/components/MainSectionTitle';
import { SubSectionTitle } from '@/ui/title/components/SubSectionTitle';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(8)};
  width: 350px;
  > * + * {
    margin-top: ${({ theme }) => theme.spacing(8)};
  }
`;

const StyledSectionContainer = styled.div`
  > * + * {
    margin-top: ${({ theme }) => theme.spacing(4)};
  }
`;

export function SettingsWorksapce() {
  return (
    <SubMenuTopBarContainer>
      <div>
        <StyledContainer>
          <MainSectionTitle>General</MainSectionTitle>
          <StyledSectionContainer>
            <SubSectionTitle title="Picture" />
            <WorkspaceLogoUploader />
          </StyledSectionContainer>
          <StyledSectionContainer>
            <SubSectionTitle
              title="Name"
              description="Name of your workspace"
            />
            <NameField />
          </StyledSectionContainer>
        </StyledContainer>
      </div>
    </SubMenuTopBarContainer>
  );
}
