import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import AboutIllustration from "../assets/about-illustration.svg";

export default function About() {
    return (
        <Layout>
            <Head>
                <title>Enkindle - Doctors Appointment</title>
                <meta name="description" content="Enkindle - Doctors Appointment" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className="w-full pt-20 pb-14 flex justify-center items-center gap-10">
                <Image src={AboutIllustration}/>
                <h1 className="mb-5 text-8xl text-primary font-semibold">About Us</h1>
            </div>
            <div className="w-5/6 lg:w-3/4 mx-auto text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta sodales lectus eget pharetra.
                Proin varius maximus porttitor. Mauris semper turpis eros, non elementum nisl malesuada eu. Nulla at ante pharetra, commodo enim vel, consequat dui. Donec consectetur dignissim pellentesque. Ut imperdiet vehicula ante ac cursus. Pellentesque ultrices sollicitudin mi.
            </div>
        </Layout>
    )
}