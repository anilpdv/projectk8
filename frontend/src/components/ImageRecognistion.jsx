import { useState, useRef } from "react";
import {
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
  Center,
  Flex,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconBrandSoundcloud,
  IconMusic,
  IconFileMusic,
} from "@tabler/icons-react";
import classes from "./ImageRecognistion.module.css";
console.log(classes);
export function ImageRecognistion() {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const [translate, setTranslate] = useState(false);

  const handleDrop = (files) => {
    console.log(files);
    setFile(files[0]);
    setPrediction(null);
  };

  const handleClick = () => {
    var formdata = new FormData();
    formdata.append("image", file, file.name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:8081/predict", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const number = parseInt(result.number);
        console.log(number);
        const word = convertNumbersToWords(number);
        setPrediction(word);
      })
      .catch((error) => console.log("error", error));
  };
  console.log(prediction);
  const fetchTextToSpeech = async () => {
    setLoading(true);
    const formdata = new FormData();
    let text = String(prediction);
    formdata.append("text", text);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:8080/tts", requestOptions);
      const data = await response.blob();
      console.log(data);
      setAudioSrc(URL.createObjectURL(data));
      await translateText(); // set the audio source to the blob data returned by the API
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };
  const handleRetry = () => {
    setFile(null);
    setPrediction(null);
  };

  const translateText = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "session=4dc10836-a3bd-4f52-a0c5-c00a95c4e7c1");

    var raw = JSON.stringify({
      q: prediction,
      source: "auto",
      target: "fi",
      format: "text",
    });

    console.log(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/translate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setTranslate(result);
      })
      .catch((error) => console.log("error", error));
  };

  //convert numebrs from 0 to 9 to words
  const convertNumbersToWords = (number) => {
    console.log(number);
    const numberWords = {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
    };
    return numberWords[number];
  };

  return (
    <div className={classes.wrapper}>
      {prediction && (
        <Center>
          <Text size="sm" weight={700} style={{ fontSize: "5rem" }}>
            {prediction ? prediction : null}
          </Text>
        </Center>
      )}
      <Center>
        {file ? (
          <div className={classes.imageWrapper}>
            <img
              width={300}
              height={400}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className={classes.image}
            />
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              {file.name}
            </Text>
          </div>
        ) : (
          <Dropzone
            openRef={openRef}
            onDrop={handleDrop}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
            maxSize={30 * 1024 ** 2}
          >
            <div style={{ pointerEvents: "none" }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop Images here</Dropzone.Accept>
                <Dropzone.Reject>Image file less than 30mb</Dropzone.Reject>
                <Dropzone.Idle>Upload Image</Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                Drag&apos;n&apos;drop image here to upload. We can accept only{" "}
                <i>.jpeg,.png</i> files that are less than 1mb in size.
              </Text>
            </div>
          </Dropzone>
        )}
      </Center>
      <Center m={10}>
        {prediction ? (
          <Button variant="light" color="orange" onClick={handleRetry}>
            Try Again
          </Button>
        ) : (
          <Button variant="light" color="orange" onClick={handleClick}>
            Submit
          </Button>
        )}
      </Center>
      <Center>
        {prediction ? (
          <Flex align={"center"} justify={"space-between"} m={20}>
            <IconFileMusic
              size={50}
              onClick={fetchTextToSpeech}
              style={{ margin: 20 }}
            />
            {translate ? (
              <Text>
                {translate.translatedText ? translate.translatedText : null}
              </Text>
            ) : null}
          </Flex>
        ) : null}
      </Center>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Center m={10}>{audioSrc && <audio src={audioSrc} controls />} </Center>
      )}
    </div>
  );
}
