import { LanguageProvider } from "@/contexts/language-context";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
