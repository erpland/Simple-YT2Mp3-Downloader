import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
  isLoading: boolean;
};

const Loader: React.FC<Props> = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;
