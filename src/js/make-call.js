// Initialize VoxImplant
const sdk = VoxImplant.getInstance();

// Login credentials - Update these with your actual credentials
const credentials = {
    username: 'up-n-by',
    password: 'Pasha@1122',
    applicationName: 'pasha',
    accountId: '9659192'  // Updated to your correct account ID
};

// Function to make a call
async function makeCall(phoneNumber) {
    try {
        // Initialize SDK if not already initialized
        if (!sdk.alreadyInitialized) {
            await sdk.init({
                showDebugInfo: true
            });
        }

        // Connect if not connected
        if (sdk.getClientState() !== VoxImplant.ClientState.CONNECTED) {
            await sdk.connect();
        }

        // Login if not logged in
        if (sdk.getClientState() !== VoxImplant.ClientState.LOGGED_IN) {
            // Format: username@app.account.voximplant.com
            const loginUser = `${credentials.username}@${credentials.applicationName}.${credentials.username}.voximplant.com`;
            console.log('Attempting login with:', loginUser);
            const loginResult = await sdk.login(loginUser, credentials.password);
            console.log('Login result:', loginResult);
        }

        // Make the call
        const call = await sdk.call({
            number: phoneNumber,
            video: false,
            customData: {
                number: phoneNumber  // This will be available in VoxEngine.customData().number
            }
        });

        // Handle call events
        call.addEventListener(VoxImplant.CallEvents.Connected, () => {
            statusDiv.textContent = 'Call connected';
            console.log('Call connected');
        });

        call.addEventListener(VoxImplant.CallEvents.Disconnected, () => {
            statusDiv.textContent = 'Call disconnected';
            console.log('Call disconnected');
            callButton.disabled = false;
            hangupButton.disabled = true;
        });

        call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
            statusDiv.textContent = 'Call failed: ' + e.reason;
            console.error('Call failed:', e.reason);
            callButton.disabled = false;
            hangupButton.disabled = true;
        });

        return call;
    } catch (error) {
        console.error('Error making call:', error);
        statusDiv.textContent = 'Error: ' + error.message;
        throw error;
    }
}

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
        callButton.disabled = false;
        hangupButton.disabled = true;
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