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

// --- v2 bulk view ---
// Calls GET /widgets/v2/all, added in cr-mrgate-backend (v2 envelope endpoint).
export async function fetchAllWidgetsV2(http: HttpClient): Promise<WidgetsV2View> {
	const envelope = await http.get<WidgetsV2Envelope>("/widgets/v2/all")
	return { widgets: envelope.items, total: envelope.total }
}

export interface WidgetsV2Envelope {
	readonly version: 2
	readonly items: readonly Widget[]
	readonly total: number
}

export interface WidgetsV2View {
	readonly widgets: readonly Widget[]
	readonly total: number
}
