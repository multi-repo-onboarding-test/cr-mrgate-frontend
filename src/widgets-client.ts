// Frontend client for the widgets backend (cr-mrgate-backend).
export class WidgetsClient {
	constructor(private readonly http: HttpClient) {}

	// Calls GET /widgets (v1).
	async list(): Promise<Widget[]> {
		return this.http.get<Widget[]>("/widgets")
	}

	// Calls GET /widgets/:id (v1).
	async get(id: string): Promise<Widget> {
		return this.http.get<Widget>(`/widgets/${id}`)
	}
}

export interface Widget {
	readonly id: string
	readonly name: string
}

export interface HttpClient {
	get<T>(path: string): Promise<T>
}

// --- v2 count helper ---
// Returns the total widget count using the v2 bulk endpoint's envelope metadata.
export async function fetchWidgetCountV2(http: HttpClient): Promise<number> {
	const envelope = await http.get<WidgetsV2Envelope>("/widgets/v2/all")
	return envelope.total
}
