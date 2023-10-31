import MesasGrid from './components/mesas-grid';
import AddButton from '@/components/button/add-button';
import PageContainer from '@/components/containers/page-container';

import { Box, Typography } from '@mui/material';

export default async function Mesas() {
  return (
    <PageContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Mesas</Typography>

        <AddButton text="Nova mesa" variant="contained" route="/mesas/form" />
      </Box>

      <MesasGrid />
    </PageContainer>
  );
}
