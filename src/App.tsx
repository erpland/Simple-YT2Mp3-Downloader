import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import { Alert, AlertTitle, Container, Link } from "@mui/material";
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
          height: "90vh",
        }}
      >
        <Loader isLoading={isLoading} />
        <Home
          isLoading={isLoading}
          setIsLoading={(val) => setIsLoading(val)}
          setAlert={(val) => setAlert(val)}
        />
        {alert && alert?.isOpen && (
          <Alert
            severity={alert.severity}
            action={alert.action}
            sx={{ position: "fixed", left: 0, width: "100%" }}
          >
            <AlertTitle>
              {alert.severity === "error" ? "Error" : "Success"}
            </AlertTitle>
            {alert.massage}
          </Alert>
        )}
      </Container>
      <Link
        position={"absolute"}
        bottom={0}
        width="100%"
        target={"_blank"}
        href="https://github.com/erpland"
        textAlign={"center"}
        variant="caption"
        padding={3}
        underline={"hover"}
      >
        by Ori Winboim
      </Link>
    </ThemeProvider>
  );
}

export default App;
