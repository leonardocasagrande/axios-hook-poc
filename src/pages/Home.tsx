import { Typography } from '@mui/material';
import useRequest from 'hooks/useRequest';
import userService from 'services/example';

const Home = () => {
  const { data } = useRequest(userService.getUsers());
  return <Typography>Tste</Typography>;
};

export default Home;
