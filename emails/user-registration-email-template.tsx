import { tedxsjecAssetsPrefix } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface TedxRegistrationEmailProps {
  name?: string;
  registrationLink: string;
}

export const TedxRegistrationEmail = ({
  name,
  registrationLink,
}: TedxRegistrationEmailProps) => {
  const previewText = `TEDxSJEC Talk Registration Successful!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-4">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* Logo Section */}
            <Section className="text-center">
              <Img
                src={`${tedxsjecAssetsPrefix}/logo/tedxsjec-logo.avif`}
                alt="TEDxSJEC Logo"
                className="mx-auto w-[150px] h-auto mb-[20px]"
              />
            </Section>
            {/* Heading Section */}
            <Section className="mt-[32px] items-center">
              <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                <strong>TEDxSJEC Talk Registration Confirmed!</strong>
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Dear {name ?? "Participant"},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We are excited to confirm your registration for TEDxSJEC Talk.{" "}
              <br />
              You are all set to join us for an inspiring day filled with ideas
              worth sharing. Please bring this email on the event day for a
              smooth entry process.
            </Text>
            {/* QR Code Section */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-center">
                Below is your unique QR code for registration. Kindly keep it
                accessible on event day for quick check-in:
              </Text>
              <Img
                className="mx-auto flex items-center justify-center py-4"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${registrationLink}`}
                alt="QR Code"
              />
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              We look forward to seeing you at TEDxSJEC! <br />
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Thanks & Regards, <br /> TEDxSJEC Team <br />
              For any queries, feel free to contact us at: tedxsjec@sjec.ac.in
            </Text>
            <div className="flex flex-col items-center justify-center text-[12px] space-x-4">
              <Button href="https://tedxsjec.in/privacy">Privacy Policy</Button>
              &nbsp;|&nbsp;
              <Button href="https://tedxsjec.in/refund">Refund Policy</Button>
              &nbsp;|&nbsp;
              <Button href="https://tedxsjec.in/terms">
                Terms and Conditions
              </Button>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TedxRegistrationEmail;
