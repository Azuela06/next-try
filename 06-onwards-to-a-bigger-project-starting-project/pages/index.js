
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

function HomePage(props) {
    return (
        <>
            <Head>
                <title>Obey Me! Places Where You Can Find MC.</title>
                <meta
                    name="Description"
                    content="Places in the devildom in which you can find yourself (MC) while playing Obey Me!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: dummy_Meetup
//         },

//     };
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://hulyanaazi:YPQ5VCSiVWv54pMd@cluster0.d222r7z.mongodb.net/NewDatabase?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

export default HomePage;