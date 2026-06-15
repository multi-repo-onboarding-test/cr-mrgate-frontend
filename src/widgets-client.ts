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
