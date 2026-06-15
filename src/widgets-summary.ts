// Builds a small summary of all widgets using the backend bulk endpoint.
// The response is intentionally untyped here; we read the fields we expect.
import type { HttpClient } from "./widgets-client.js"

export interface WidgetsSummary {
	readonly names: readonly string[]
	readonly count: number
}

// GET /widgets/v2/all and summarize. We read `data` (the widget array) and
// `count` (the number of widgets) off the response.
export async function summarizeWidgetsV2(
	http: HttpClient,
): Promise<WidgetsSummary> {
	const res = await http.get<Record<string, unknown>>("/widgets/v2/all")
	const data = res.data as { name: string }[]
	return {
		names: data.map(w => w.name),
		count: res.count as number,
	}
}
