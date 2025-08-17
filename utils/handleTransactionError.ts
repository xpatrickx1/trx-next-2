export const handleTransactionErrorV2 = (
    error: any,
    stage: "build" | "sign",
    SendFrontendPing: (event: string, msg: string) => void
): string => {
    let userMessage = "❌ Что-то пошло не так. Попробуйте позже.";
    let technicalLog = `❌ Ошибка на этапе ${stage === "build" ? "создания транзакции" : "подписи транзакции"}`;

    try {
        if (!error) {
            technicalLog += " — error is null/undefined";
            SendFrontendPing("ERROR", technicalLog);
            return userMessage;
        }

        const message = error?.message || "";
        const code = error?.code || "";
        const name = error?.name || "";

        // --- Ошибки на этапе создания транзакции ---
        if (stage === "build") {
            if (message.includes("INVALID_ADDRESS")) {
                userMessage = "🚫 Неверный адрес получателя.";
                technicalLog += " — Неверный адрес";
            } else if (message.includes("insufficient balance")) {
                userMessage = "🚫 Недостаточно средств на кошельке.";
                technicalLog += " — Недостаточно средств";
            } else {
                userMessage = "❌ Не удалось создать транзакцию.";
                technicalLog += ` — ${message}`;
            }
        }

        // --- Ошибки на этапе подписи транзакции ---
        if (stage === "sign") {
            if (message.includes("User rejected") || message.includes("user rejected") || code === 4001) {
                userMessage = "❌ Вы отменили подпись транзакции.";
                technicalLog += " — Пользователь отклонил подпись";
            } else if (message.includes("No active session")) {
                userMessage = "⚠️ Сессия WalletConnect истекла. Подключите кошелёк заново.";
                technicalLog += " — WalletConnect session expired";
            } else if (message.includes("signTransaction is not a function")) {
                userMessage = "🚫 Метод подписи не поддерживается. Убедитесь, что вы используете Trust Wallet.";
                technicalLog += " — Метод signTransaction недоступен";
            } else if (message.includes("Unsupported network")) {
                userMessage = "⚠️ Неподдерживаемая сеть. Переключитесь на TRON.";
                technicalLog += " — Unsupported chain";
            } else {
                userMessage = "❌ Не удалось подписать транзакцию.";
                technicalLog += ` — ${message}`;
            }
        }

        SendFrontendPing("ERROR", technicalLog);
    } catch (internalError) {
        SendFrontendPing("ERROR", `Error inside handleTransactionError: ${internalError}`);
    }

    return userMessage;
};

export const handleTransactionError = (
    error: any,
    stage: "build" | "sign",
    SendToTelegram: (msg: string, silent: number) => void
): string => {
    let userMessage = "❌ Что-то пошло не так. Попробуйте позже.";
    let technicalLog = `❌ Ошибка на этапе ${stage === "build" ? "создания транзакции" : "подписи транзакции"}`;

    try {
        if (!error) {
            technicalLog += " — error is null/undefined";
            SendToTelegram(technicalLog, 0);
            return userMessage;
        }

        const message = error?.message || "";
        const code = error?.code || "";
        const name = error?.name || "";

        // --- Ошибки на этапе создания транзакции ---
        if (stage === "build") {
            if (message.includes("INVALID_ADDRESS")) {
                userMessage = "🚫 Неверный адрес получателя.";
                technicalLog += " — Неверный адрес";
            } else if (message.includes("insufficient balance")) {
                userMessage = "🚫 Недостаточно средств на кошельке.";
                technicalLog += " — Недостаточно средств";
            } else {
                userMessage = "❌ Не удалось создать транзакцию.";
                technicalLog += ` — ${message}`;
            }
        }

        // --- Ошибки на этапе подписи транзакции ---
        if (stage === "sign") {
            if (message.includes("User rejected") || message.includes("user rejected") || code === 4001) {
                userMessage = "❌ Вы отменили подпись транзакции.";
                technicalLog += " — Пользователь отклонил подпись";
            } else if (message.includes("No active session")) {
                userMessage = "⚠️ Сессия WalletConnect истекла. Подключите кошелёк заново.";
                technicalLog += " — WalletConnect session expired";
            } else if (message.includes("signTransaction is not a function")) {
                userMessage = "🚫 Метод подписи не поддерживается. Убедитесь, что вы используете Trust Wallet.";
                technicalLog += " — Метод signTransaction недоступен";
            } else if (message.includes("Unsupported network")) {
                userMessage = "⚠️ Неподдерживаемая сеть. Переключитесь на TRON.";
                technicalLog += " — Unsupported chain";
            } else {
                userMessage = "❌ Не удалось подписать транзакцию.";
                technicalLog += ` — ${message}`;
            }
        }

        SendToTelegram(technicalLog, 0);
    } catch (internalError) {
        SendToTelegram(`❌ Ошибка внутри handleTransactionError: ${internalError}`, 0);
    }

    return userMessage;
};