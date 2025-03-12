// Required modules
require(Modules.Avatar);

// Function to handle outbound calls
VoxEngine.addEventListener(AppEvents.Started, (e) => {
    // Get the phone number from the call session
    const phoneNumber = VoxEngine.customData().number;
    
    if (phoneNumber) {
        // Make outbound call
        const call = VoxEngine.callPSTN(phoneNumber, "default");
        
        // Create avatar instance for outbound call
        const voiceAvatar = VoximplantAvatar.createVoiceAvatar({
            call,
            avatarConfig: {
                avatarId: '0c7d4483-abc0-4da1-ad13-0da15d29fc7b',
                avatarName: 'avatar-additional-sales-hsopnhv',
                extended: false
            },
            asrParameters: {
                model: ASRModelList.Google,
                profile: ASRProfileList.Google.en_US
            },
            ttsPlayerOptions: {
                language: VoiceList.Google.en_US_Standard_A
            }
        });

        // Handle successful connection
        call.addEventListener(CallEvents.Connected, () => {
            voiceAvatar.start({
                initialPrompt: "Hello! I'm your virtual assistant. How can I help you today?"
            });
        });
    }
});

// Handle incoming calls
VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
    const { call } = e;

    // Create simple avatar instance for incoming calls
    const voiceAvatar = VoximplantAvatar.createVoiceAvatar({
        call,
        avatarConfig: {
            avatarId: '0c7d4483-abc0-4da1-ad13-0da15d29fc7b',
            avatarName: 'avatar-additional-sales-hsopnhv',
            extended: false
        },
        asrParameters: {
            model: ASRModelList.Google,
            profile: ASRProfileList.Google.en_US
        },
        ttsPlayerOptions: {
            language: VoiceList.Google.en_US_Standard_A
        }
    });

    // Handle call connection
    call.addEventListener(CallEvents.Connected, () => {
        voiceAvatar.start({
            initialPrompt: "Hello! I'm your virtual assistant. How can I help you today?"
        });
    });

    // Answer the call
    call.answer();
}); 