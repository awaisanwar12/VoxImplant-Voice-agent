// Required modules
require(Modules.Avatar);

// Voice bot configuration
const AVATAR_CONFIG = {
    avatarId: '0c7d4483-abc0-4da1-ad13-0da15d29fc7b',
    extended: true // Enable extended features
};

// ASR (Automatic Speech Recognition) settings
const ASR_CONFIG = {
    model: ASRModelList.Google,
    profile: ASRProfileList.Google.en_US,
    phraseHints: [
        "help", "support", "menu", "operator",
        "yes", "no", "main menu", "goodbye"
    ],
    singleUtterance: true,
    interimResults: true
};

// TTS (Text-to-Speech) settings
const TTS_CONFIG = {
    language: VoiceList.Google.en_US_Standard_A
};

// Welcome message
const WELCOME_MESSAGE = "Welcome to our service! You can say 'menu' to hear options, " +
                       "'operator' to speak with a human, or ask me any question.";

// Main menu options
const MENU_OPTIONS = {
    "1": "Technical Support",
    "2": "Sales Inquiry",
    "3": "Billing Questions",
    "0": "Speak to an Operator"
};

// Handle incoming calls
VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
    const { call } = e;

    // Error handler
    const handleError = (error) => {
        Logger.write('Avatar Error: ' + JSON.stringify(error));
        // Play error message before hanging up
        call.say("I'm sorry, but there seems to be a problem. Please try again later.");
        call.hangup();
    };

    // Completion handler
    const handleFinish = (event) => {
        Logger.write('Avatar Session Finished: ' + JSON.stringify(event));
        call.hangup();
    };

    // DTMF handler
    const handleDTMF = (e) => {
        const digit = e.digit;
        if (MENU_OPTIONS[digit]) {
            Logger.write('DTMF received: ' + digit);
            if (digit === "0") {
                transferToOperator(call);
            } else {
                // Handle menu selection
                call.say("You selected " + MENU_OPTIONS[digit]);
            }
        }
    };

    // Transfer to operator function
    const transferToOperator = (call) => {
        Logger.write('Transferring to operator');
        call.say("Please hold while I transfer you to an operator.");
        // Replace with your operator's phone number or SIP address
        call.transfer("operator@pasha.up-n-by.n2.voximplant.com");
    };

    // Create voice avatar instance
    const voiceAvatar = VoximplantAvatar.createVoiceAvatar({
        call,
        asrEndOfPhraseDetectorTimeout: 1500, // Increased timeout for better phrase detection
        onErrorCallback: handleError,
        onFinishCallback: handleFinish,
        avatarConfig: AVATAR_CONFIG,
        asrParameters: ASR_CONFIG,
        ttsPlayerOptions: TTS_CONFIG,
        customData: {
            lastMenuContext: null,
            retryCount: 0,
            maxRetries: 3
        }
    });

    // Handle call events
    call.addEventListener(CallEvents.Connected, () => {
        Logger.write('Call connected, starting avatar interaction');
        // Play welcome message
        call.say(WELCOME_MESSAGE);
    });

    call.addEventListener(CallEvents.Disconnected, () => {
        Logger.write('Call disconnected');
    });

    // Handle DTMF
    call.addEventListener(CallEvents.ToneReceived, handleDTMF);

    // Answer the incoming call
    call.answer();
}); 