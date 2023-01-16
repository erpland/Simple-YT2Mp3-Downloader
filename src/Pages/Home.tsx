import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import "./home.css";
type Props = {};

const Home = (props: Props) => {
  const [url, setUrl] = useState("");
  const server = "http://localhost:4000";
  const [link, setLink] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!url) {
      return alert("Must Provide URL!");
    }
    setisLoading(true);
    await downloadMp3();
    setisLoading(false);
  };

  const downloadMp3 = async () => {
    try {
      const res = await fetch(`${server}/download?url=${url.trim()}`);
      if (res.status == 200) {
        return setLink(res.url);
      } else {
        console.log(await res.json());
      }
    } catch (err) {
      console.log("aaaa");
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Backdrop open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>

      <Stack spacing={3}>
        <Typography variant="h4">Youtube To Mp3</Typography>
        <TextField
          variant="outlined"
          label="Youtube Video URL"
          fullWidth
          color="primary"
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <Stack direction={"row"} spacing={1}>
          <Button
            onClick={submitHandler}
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Get Link
          </Button>
          <Button
            type="reset"
            variant="outlined"
            fullWidth
            color="error"
            disabled={isLoading}
          >
            Reset
          </Button>
        </Stack>
        {link && (
          <a
            download={true}
            href={link}
            onClick={() => {
              setLink("");
            }}
          >
            download
          </a>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
