import { faqSchema, localBusinessSchema, personSchema } from "@/lib/schema";

const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema, personSchema, faqSchema],
};

export function SchemaScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
