import { categories } from "@/data/services";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/wa";

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
  };
};

type WebMcpRegisterOptions = {
  signal?: AbortSignal;
};

type ModelContext = {
  registerTool: (tool: WebMcpTool, options?: WebMcpRegisterOptions) => Promise<void>;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
}

const categoryEnum = [...categories];

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function reservationMessage(input: Record<string, unknown>): string {
  const serviceCategory = asOptionalString(input.serviceCategory);
  const serviceName = asOptionalString(input.serviceName);
  const preferredTime = asOptionalString(input.preferredTime);
  const notes = asOptionalString(input.notes);

  return [
    `Hola María José, quiero reservar una hora en ${SITE.name}.`,
    serviceCategory ? `Categoría: ${serviceCategory}` : undefined,
    serviceName ? `Servicio o piercing: ${serviceName}` : undefined,
    preferredTime ? `Horario ideal: ${preferredTime}` : undefined,
    notes ? `Comentarios: ${notes}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

function scrollToElement(element: Element) {
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function registerCotepiercingWebMcpTools(): AbortController | undefined {
  if (typeof document === "undefined" || !document.modelContext) return undefined;

  const controller = new AbortController();

  const tools: WebMcpTool[] = [
    {
      name: "get_business_info",
      description:
        "Returns Cotepiercing contact, service area, private location policy, hours and booking link for a user planning a piercing visit.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: false,
      },
      execute: () => ({
        name: SITE.name,
        professional: SITE.professional,
        phone: SITE.phoneDisplay,
        serviceArea: SITE.serviceArea,
        locationNote: SITE.locationDisclosure,
        hours: SITE.openingHoursText,
        reservationUrl: waLink(),
      }),
    },
    {
      name: "show_service_category",
      description:
        "Shows a Cotepiercing service category on the page so the user can review piercings and prices.",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: categoryEnum,
            description: "Service category to display in the catalog.",
          },
        },
        required: ["category"],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: false,
      },
      execute: ({ category }) => {
        if (
          typeof category !== "string" ||
          !categoryEnum.includes(category as (typeof categoryEnum)[number])
        ) {
          throw new Error("Category must be one of the published Cotepiercing service categories.");
        }

        const button = document.querySelector<HTMLButtonElement>(
          `[data-service-category="${CSS.escape(category)}"]`,
        );
        if (!button)
          throw new Error("The requested service category is not available on this page.");

        button.click();
        scrollToElement(button);
        return `Showing ${category} services.`;
      },
    },
    {
      name: "open_reservation_whatsapp",
      description:
        "Opens WhatsApp with a draft reservation message for Cotepiercing using service and schedule details.",
      inputSchema: {
        type: "object",
        properties: {
          serviceCategory: {
            type: "string",
            enum: categoryEnum,
            description: "General category for the piercing or evaluation.",
          },
          serviceName: {
            type: "string",
            description: "Specific piercing, evaluation or jewelry change requested.",
          },
          preferredTime: {
            type: "string",
            description: "Preferred day or time written naturally by the user.",
          },
          notes: {
            type: "string",
            description: "Relevant context such as age, zone, irritation or first piercing.",
          },
        },
        required: ["serviceName"],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: false,
        untrustedContentHint: false,
      },
      execute: (input) => {
        const url = waLink(reservationMessage(input));
        window.location.href = url;
        return "WhatsApp reservation draft opened.";
      },
    },
  ];

  for (const tool of tools) {
    document.modelContext.registerTool(tool, { signal: controller.signal }).catch((error) => {
      console.warn("WebMCP tool registration failed", tool.name, error);
    });
  }

  return controller;
}
