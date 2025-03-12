// Initialize VoxImplant
const sdk = VoxImplant.getInstance();

// Login credentials
const credentials = {
    username: 'up-n-by', // Your username
    password: 'Pasha@1122', // Your password
    node: 'NODE_2'
};

// Function to make a call
async function makeCall(phoneNumber) {
    try {
        // Initialize SDK if not already initialized
        if (!sdk.alreadyInitialized) {
            await sdk.init({
                node: credentials.node,
                showDebugInfo: true
            });
        }

        // Connect if not connected
        if (sdk.getClientState() !== VoxImplant.ClientState.CONNECTED) {
            await sdk.connect();
        }

        // Login if not logged in
        if (sdk.getClientState() !== VoxImplant.ClientState.LOGGED_IN) {
            await sdk.login(credentials.username, credentials.password);
        }

        // Make the call
        const call = await sdk.call({
            number: phoneNumber,
            video: false, // Set to true for video calls
            customData: "Test call"
        });

        // Handle call events
        call.addEventListener(VoxImplant.CallEvents.Connected, () => {
            console.log('Call connected');
        });

        call.addEventListener(VoxImplant.CallEvents.Disconnected, () => {
            console.log('Call disconnected');
        });

        call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
            console.error('Call failed:', e.reason);
        });

        return call;
    } catch (error) {
        console.error('Error making call:', error);
        throw error;
    }
}

// HTML elements for the call interface
const callInterface = `
<div class="call-container">
    <input type="text" id="phoneNumber" placeholder="Enter phone number">
    <button id="callButton">Make Call</button>
    <button id="hangupButton" disabled>Hang Up</button>
    <div id="callStatus"></div>
</div>
`;

// Add the interface to the page
document.body.insertAdjacentHTML('beforeend', callInterface);

// Get elements
const phoneInput = document.getElementById('phoneNumber');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
const statusDiv = document.getElementById('callStatus');

let currentCall = null;

// Add event listeners
callButton.addEventListener('click', async () => {
    const number = phoneInput.value.trim();
    if (!number) {
        statusDiv.textContent = 'Please enter a phone number';
        return;
    }

    try {
        statusDiv.textContent = 'Initiating call...';
        currentCall = await makeCall(number);
        callButton.disabled = true;
        hangupButton.disabled = false;
    } catch (error) {
        statusDiv.textContent = 'Failed to make call: ' + error.message;
    }
});

hangupButton.addEventListener('click', () => {
    if (currentCall) {
        currentCall.hangup();
        currentCall = null;
        callButton.disabled = false;
        hangupButton.disabled = true;
        statusDiv.textContent = 'Call ended';
    }
}); 