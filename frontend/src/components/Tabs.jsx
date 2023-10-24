import { useState } from "react";
import {
  SegmentedControl,
  Center,
  Divider,
  Container,
  Stack,
} from "@mantine/core";
import TextToSpeech from "./TextToSpeech";
import { ImageRecognistion } from "./ImageRecognistion";

const tabs = {
  textToSpeech: <TextToSpeech />,
  imagePrediction: <ImageRecognistion />,
  textTranslation: <div>textTranslation</div>,
};

export function Tabs() {
  const [section, setSection] = useState("textToSpeech");

  const component = tabs[section];

  return (
    <Center p={90}>
      <Stack>
        <Container>
          <SegmentedControl
            size="sm"
            value={section}
            onChange={(value) => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: "Text to Speech", value: "textToSpeech" },
              { label: "Image Prediction", value: "imagePrediction" },
              { label: "Text Translation", value: "textTranslation" },
            ]}
          />
        </Container>

        {<div>{component}</div>}
      </Stack>
    </Center>
  );
}
