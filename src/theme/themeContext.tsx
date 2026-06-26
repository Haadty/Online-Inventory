import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme";

type Mode = "light" | "dark";

interface ThemeContextType {
    mode: Mode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: "light",
    toggleTheme: () => { },
});

export function useThemeMode() {
    return useContext(ThemeContext);
}

export function CustomThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<Mode>("light");

    const toggleTheme = () => {
        setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newMode);
            return newMode;
        });
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
