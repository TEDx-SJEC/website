import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Button,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  OTP: string;
}

export const EmailTemplate = ({ name, OTP }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your OTP for Tedx 2024 Email Verification</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={company}>Tedx SJEC</Text>
        <Heading style={codeTitle}>Hello {name},</Heading>
        <Text style={codeDescription}>
          Thank you for registering for Tedx 2024.
        </Text>
        <Text style={codeDescription}>
          Your One-Time Password (OTP) for email verification is:
        </Text>
        <Section style={codeContainer}>
          <Heading style={codeStyle}>{OTP}</Heading>
        </Section>
        <Text style={codeDescription}>
          Please enter this OTP to complete your registration. The OTP is valid
          for 10 minutes.
        </Text>
        <Section style={buttonContainer}>
          <Button href="https://www.tedxsjec.in" style={button}>
            Go to Tedx SJEC
          </Button>
        </Section>
        <Text style={paragraph}>Thank you!</Text>
        <Text style={paragraph}>
          <strong>Tedx SJEC Team</strong>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "20px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "12% 6%",
};

const company = {
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: "center" as const,
};

const codeTitle = {
  textAlign: "center" as const,
};

const codeDescription = {
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
  maxWidth: "100%",
};

const codeStyle = {
  color: "#000",
  display: "inline-block",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
  letterSpacing: "8px",
};

const buttonContainer = {
  margin: "27px auto",
  width: "auto",
};

const button = {
  backgroundColor: "red",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "center" as const,
  padding: "12px 24px",
  margin: "0 auto",
};

const paragraph = {
  color: "#444",
  letterSpacing: "0",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};
