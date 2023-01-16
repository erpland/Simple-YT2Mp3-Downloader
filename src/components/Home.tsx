import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DownloadIcon from "@mui/icons-material/Download";
import { AlertType } from "../types/types";
type Props = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setAlert: React.Dispatch<SetStateAction<AlertType | undefined>>;
};

const Home: React.FC<Props> = ({
  isLoading,
  setIsLoading,
  setAlert,
}) => {
  const [url, setUrl] = useState("");
  const server = "http://localhost:4000";
  const [link, setLink] = useState("");
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (link) {
      setAlert({
        severity: "success",
        isOpen: true,
        massage:
          "Download Should Start Automaticly If Not Click The Red Icon",
        action: (
          <IconButton
            sx={{ alignSelf: "center" }}
            size={"large"}
            href={link}
            color="error"
            download
            onClick={() => setAlert(undefined)}
          >
            <DownloadIcon fontSize="large" />
          </IconButton>
        ),
      });
      // linkRef.current?.click();
    }
  }, [link]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      return setAlert({
        severity: "error",
        isOpen: true,
        massage: "Must Provide Url",
      });
    }
    setIsLoading(true);
    await downloadMp3();
    setIsLoading(false);
  };

  const downloadMp3 = async () => {
    try {
      const res = await fetch(`${server}/download?url=${url.trim()}`);
      if (res.status == 200) {
        return setLink(res.url);
      } else {
        const msg = await res.json();
        return setAlert({
          severity: "error",
          isOpen: true,
          massage: msg.error,
        });
      }
    } catch (err) {
      return setAlert({
        severity: "error",
        isOpen: true,
        massage: "Error Fetching Check You Internet Connection",
      });
    }
  };

  const handlePaste = async () => {
    setAlert(undefined);
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      justifyContent="center"
    >
      <Stack spacing={3} alignItems="space-around">
        <Typography textAlign={"center"} variant="h4">
          Youtube To Mp3
        </Typography>
        <form onSubmit={submitHandler}>
          <Stack spacing={3}>
            <TextField
              value={url}
              variant="outlined"
              label="Youtube Video URL"
              fullWidth
              color="primary"
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              onFocus={() => setLink("")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="start" onClick={handlePaste}>
                      <ContentPasteIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction={"row"} spacing={2}>
              <Button
                type="submit"
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
                onClick={() => setLink("")}
                disabled={isLoading}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </form>
        <a href={link} download ref={linkRef}></a>
      </Stack>
    </Box>
  );
};

export default Home;
