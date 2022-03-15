// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import 'uno.css'
import '@unocss/reset/tailwind.css'

export default function Root() {
  return (
    <html lang="en" class="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body class="h-full">
        <Routes />
        <Scripts />
      </body>
    </html>
  );
}
