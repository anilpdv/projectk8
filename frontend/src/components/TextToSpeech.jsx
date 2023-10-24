import { Textarea, Container, Button, Center } from "@mantine/core";
import React from "react";

const TextToSpeech = () => {
  const [text, setText] = React.useState("");
  const [audioSrc, setAudioSrc] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const fetchTextToSpeech = async () => {
    setLoading(true);
    const formdata = new FormData();
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
      setAudioSrc(URL.createObjectURL(data)); // set the audio source to the blob data returned by the API
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };
  return (
    <Container>
      <Textarea
        size="lg"
        autosize
        description="Convert text to speech"
        placeholder="Enter text here"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        <Center m={10}>{audioSrc && <audio src={audioSrc} controls />} </Center>
      )}

      <Center>
        <Button variant="light" color="orange" onClick={fetchTextToSpeech}>
          Submit
        </Button>
      </Center>
    </Container>
  );
};

export default TextToSpeech;
