import * as React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

export const wrapRootElement = ({ element }) => {
  axios.defaults.baseURL =
    "https://us-central1-ohnestpos-db448.cloudfunctions.net/app/tripleaim";
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>{element}</MuiThemeProvider>
      </QueryClientProvider>
    </>
  );
};
