// Avatar conversation rules
export const conversationRules = {
    // Intent mappings
    intents: {
        "menu": {
            responses: [
                "Here are your options:",
                "Press or say 1 for Technical Support",
                "Press or say 2 for Sales Inquiry",
                "Press or say 3 for Billing Questions",
                "Press or say 0 to speak with an operator"
            ],
            followUp: true
        },
        "technical_support": {
            responses: [
                "I can help you with technical issues. What problem are you experiencing?",
                "Common issues I can help with include:",
                "- Login problems",
                "- Connection issues",
                "- Application errors"
            ],
            followUp: true
        },
        "sales_inquiry": {
            responses: [
                "I'd be happy to help you with sales information.",
                "Are you interested in our:",
                "- Enterprise solutions",
                "- Small business packages",
                "- Individual services"
            ],
            followUp: true
        },
        "billing": {
            responses: [
                "I can assist you with billing questions.",
                "Common topics include:",
                "- Current balance",
                "- Payment methods",
                "- Billing cycle"
            ],
            followUp: true
        },
        "operator": {
            responses: [
                "I'll connect you with an operator right away.",
                "Please hold while I transfer your call."
            ],
            action: "transfer_to_operator"
        },
        "goodbye": {
            responses: [
                "Thank you for calling. Have a great day!",
                "Goodbye!"
            ],
            action: "end_call"
        }
    },

    // Fallback responses
    fallback: {
        responses: [
            "I'm sorry, I didn't quite catch that. Could you please repeat?",
            "I'm not sure I understood. Would you like me to repeat the menu options?",
            "If you need help, you can say 'menu' at any time."
        ],
        maxRetries: 3
    },

    // Error handling
    error: {
        responses: [
            "I apologize, but I'm having trouble understanding. Would you like to speak with an operator?",
            "I'm experiencing some difficulties. Let me transfer you to someone who can help."
        ],
        action: "transfer_to_operator"
    }
}; 