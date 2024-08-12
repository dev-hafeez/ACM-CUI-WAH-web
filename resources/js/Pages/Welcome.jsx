import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
    Checkbox,
} from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Navbar } from "@/widgets/layout";
import { routes } from "@/routes";
export function Welcome({ teams }) {
    console.log(teams);
    return (
        <>
            <Head title="ACM CUI Wah" />

            <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                <Navbar routes={routes} />
            </div>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                Empowering Tomorrow's Innovators.
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="opacity-80"
                            >
                                Join ACM CUI Wah to connect, learn, and grow in
                                the world of computing and technology. We offer
                                a platform for students to explore their
                                potential through workshops, seminars, and
                                competitions.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-32 bg-white px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuresData.map(
                            ({ color, title, icon, description }) => (
                                <FeatureCard
                                    key={title}
                                    color={color}
                                    title={title}
                                    icon={React.createElement(icon, {
                                        className: "w-5 h-5 text-white",
                                    })}
                                    description={description}
                                />
                            ),
                        )}
                    </div>
                    <div className="mt-32 flex flex-wrap items-center">
                        <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                                <FingerPrintIcon className="h-8 w-8 text-white " />
                            </div>
                            <Typography
                                variant="h3"
                                className="mb-3 font-bold"
                                color="blue-gray"
                            >
                                Working with us is a pleasure
                            </Typography>
                            <Typography className="mb-8 font-normal text-blue-gray-500">
                                At ACM CUI Wah, we believe in fostering a
                                community of passionate learners and innovators.
                                Our mission is to provide a supportive
                                environment where students can explore their
                                interests in computing and technology. Through
                                various events and initiatives, we aim to bridge
                                the gap between academia and industry.
                            </Typography>
                            <Button variant="filled">read more</Button>
                        </div>
                        <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                            <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                                <CardHeader
                                    floated={false}
                                    className="relative h-56"
                                >
                                    <img
                                        alt="Card Image"
                                        src="/img/teamwork.png"
                                        className="h-full w-full"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        Society
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mb-3 mt-2 font-bold"
                                    >
                                        Lorem ipsum dolor sit amet
                                    </Typography>
                                    <Typography className="font-normal text-blue-gray-500">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Sequi nostrum hic
                                        repudiandae rerum aperiam commodi
                                        voluptatum, quidem nemo blanditiis aut
                                        aspernatur. Nemo obcaecati reiciendis
                                        suscipit dignissimos repellat ratione
                                        dolorum expedita.
                                    </Typography>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 pt-20 pb-48 text-center">
                <div className="container mx-auto">
                    <PageTitle section="Our Team" heading="Here are our heroes">
                        Meet the dedicated individuals behind ACM CUI Wah. Our
                        team works tirelessly to bring you the best events and
                        opportunities.
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {teams
                            .filter(
                                (team) =>
                                    team.position === "President" ||
                                    team.position === "Vice President" ||
                                    team.position === "Director Operations" ||
                                    team.position === "General Secretary" 
                            )
                            .slice(0, 4)
                            .map((team) => (
                                <TeamCard
                                    key={team.id}
                                    img={team.img}
                                    name={team.name}
                                    position={team.position}
                                    club={team.club}
                                />
                            ))}
                    </div>
                </div>
                <div className="mt-12">
                    <Link href="our-team">
                        <Button>View All</Button>
                    </Link>
                </div>
            </section>
            <section className="relative bg-white py-24 px-4">
                <div className="container mx-auto">
                    <PageTitle section="Co-Working" heading="Build something">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptatibus quibusdam voluptatum quasi quod!
                    </PageTitle>
                    <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {contactData.map(({ title, icon, description }) => (
                            <Card
                                key={title}
                                color="transparent"
                                shadow={false}
                                className="text-center text-blue-gray-900"
                            >
                                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                                    {React.createElement(icon, {
                                        className: "w-5 h-5 text-white",
                                    })}
                                </div>
                                <Typography
                                    variant="h5"
                                    color="blue-gray"
                                    className="mb-2"
                                >
                                    {title}
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500">
                                    {description}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                    <PageTitle
                        section="Contact Us"
                        heading="Want to Join us?"
                    >
                        Complete this form and we will get back to you in 24
                        hours.
                    </PageTitle>
                    <form className="mx-auto w-full mt-12 lg:w-5/12">
                        <div className="mb-8 flex gap-8">
                            <Input
                                variant="outlined"
                                size="lg"
                                label="Full Name"
                            />
                            <Input
                                variant="outlined"
                                size="lg"
                                label="Email Address"
                            />
                        </div>
                        <Textarea
                            variant="outlined"
                            size="lg"
                            label="Message"
                            rows={8}
                        />
                        <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button
                            variant="gradient"
                            size="lg"
                            className="mt-8"
                            fullWidth
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Welcome;
