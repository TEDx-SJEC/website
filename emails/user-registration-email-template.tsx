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

export const TedxRegistrationEmail = ({ name, registrationLink }: TedxRegistrationEmailProps) => {
    const previewText = `TEDxSJEC 2024 Registration Confirmed!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans p-4">
                    <Container className="border border-solid border-gray-300 rounded-lg mx-auto p-6 max-w-md shadow-lg">
                        {/* Logo Section */}
                        <Section className="text-center">
                            <Img
                                src={`${tedxsjecAssetsPrefix}/logo/main-logo.png`}
                                alt="TEDxSJEC Logo"
                                className="mx-auto w-60 h-44 mt-4"
                            />
                        </Section>

                        {/* Heading Section */}
                        <Section className="mt-8 text-center">
                            <Heading className="text-black text-2xl font-extrabold mb-6">
                                🎉 Your TEDxSJEC 2024 Registration is Confirmed! 🎉
                            </Heading>
                        </Section>

                        <Text className="text-black text-base leading-6 mb-4">
                            Dear {name ?? "Valued Participant"},
                        </Text>

                        <Text className="text-gray-700 text-base leading-6 mb-6">
                            We’re thrilled to welcome you to TEDxSJEC 2024! Get ready for an extraordinary day
                            of inspiring talks, innovative ideas, and engaging conversations. Your journey
                            into a world of “ideas worth spreading” starts here.
                        </Text>

                        {/* QR Code Section */}
                        <Section className="text-center my-8">
                            <Text className="text-gray-700 text-base mb-4">
                                Below is your unique QR code for event check-in. Please ensure you can access
                                it easily on the event day for a seamless entry process:
                            </Text>
                            <Img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${registrationLink}`}
                                alt="QR Code"
                                className="mx-auto"
                            />
                        </Section>

                        <Text className="text-gray-700 text-base leading-6 mb-4">
                            We look forward to seeing you at TEDxSJEC 2024! If you have any questions or need
                            assistance, don’t hesitate to reach out to our support team.
                        </Text>

                        <Hr className="border border-solid border-gray-200 my-6" />

                        {/* Footer Section */}
                        <Text className="text-gray-500 text-sm leading-6 mb-4">
                            Thank you for being a part of TEDxSJEC 2024. If you have any questions, feel free
                            to reach out to us at:{" "}
                            <a href="mailto:support.tedx@sjec.ac.in" className="text-blue-500 underline">
                                support.tedx@sjec.ac.in
                            </a>
                        </Text>

                        <div className="flex justify-center space-x-2 text-sm text-gray-500">
                            <Button href="https://tedxsjec.in/privacy" className="text-blue-500 underline">
                                Privacy Policy
                            </Button>
                            <span>|</span>
                            <Button href="https://tedxsjec.in/refund" className="text-blue-500 underline">
                                Refund Policy
                            </Button>
                            <span>|</span>
                            <Button href="https://tedxsjec.in/terms" className="text-blue-500 underline">
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
