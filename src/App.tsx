import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import {
  Alert,
  AlertTitle,
  Container,
  Typography,
} from "@mui/material";
import Loader from "./components/Loader";
import { AlertType } from "./types/types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
    text: {
      primary: "#ffffffde",
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>();

  useEffect(() => {
    if (alert && alert.severity === "error") {
      setTimeout(() => {
        setAlert(undefined);
      }, 5000);
    }
  }, [alert]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Loader isLoading={isLoading} />
        <Home
          isLoading={isLoading}
          setIsLoading={(val) => setIsLoading(val)}
          setAlert={(val) => setAlert(val)}
        />
        {alert && alert?.isOpen && (
          <Alert severity={alert.severity} action={alert.action}>
            <AlertTitle>
              {alert.severity === "error" ? "Error" : "Success"}
            </AlertTitle>
            {alert.massage}
          </Alert>
        )}
        <Typography
          textAlign={"center"}
          variant="caption"
          flexGrow={1}
          padding={2}
        >
          by Ori Winboim
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
