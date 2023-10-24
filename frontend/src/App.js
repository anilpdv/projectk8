import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Tabs } from "./components/Tabs";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Tabs />
    </MantineProvider>
  );
}

export default App;
