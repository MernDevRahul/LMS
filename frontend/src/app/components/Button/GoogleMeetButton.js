import { updateBatch } from '@/app/api/batchApi';
import { authenticateUser, createMeetSpace } from '@/app/api/googleMeetApi';
import { UserContext } from '@/app/context/UserContext';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

const MeetButton = ({ batch }) => {
    const { state } = useContext(UserContext);
    const [meetingUrl, setMeetingUrl] = useState('');
    const handleCreateMeet = async (id) => {
        console.log(id);

        // Show loading toast and store its ID to manage it later
        const toastId = toast.loading("Generating Meet URL");

        try {
            // Step 1: Authenticate User (if not already authenticated)
            await authenticateUser(); // Stores token in session
            // Step 2: Create Meet Space
            const data = await createMeetSpace();
            setMeetingUrl(data.meetingUrl); // Store the meeting link
            console.log(data);

            let update = await updateBatch(state, id, { BatchLink: data.meetingUrl })
            if (update) {
                console.log("meeting Save");
            }
            // Step 3: Show success toast and close the loading toast
            toast.success("Created successfully.", { id: toastId });

        } catch (error) {
            console.error('Error:', error);
            // Step 3: Show error toast and close the loading toast
            toast.error("Failed to create Meeting.", { id: toastId });
        }
    };

    return (
        <div className='d-flex justify-content-between'>
            {batch.BatchLink !== "" && (
                <span style={{flexGrow:"1"}}>
                    <a href={meetingUrl ? meetingUrl : batch?.BatchLink} rel="noopener noreferrer" title='Join Meeting'>
                        <button className={`btn btn-success btn-sm rounded-0`}
                        style={{width:"100%"}}>
                        <i className="bi bi-people-fill"></i>
                        </button>
                    </a>
                </span>
            )}
            <span title='Create New' style={{flexGrow:"1"}}>
                <button
                    className='btn btn-primary btn-sm rounded-0'
                    onClick={() => handleCreateMeet(batch._id)}
                    style={{width:"100%"}}
                >
                    Create New
                </button>
            </span>
        </div>
    );
};

export default MeetButton;
