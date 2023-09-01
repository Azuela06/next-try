import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetup() {
    const router = useRouter();

    async function addMeetup(enteredMeetup) {

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetup),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return (
        <>
            <Head>
                <title>Add Meetup</title>
                <meta
                    name="Description"
                    content="Add your favorite places inside the game that you hold dear!"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetup} />
        </>
    );
}

export default NewMeetup;