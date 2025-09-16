import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true, // ✅ habilita describe/test/expect globales
        environment: "node", // opcional, para tests que corran en Node
    },
});
