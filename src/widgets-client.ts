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

	// Calls POST /v2/widgets/bulk (v2 bulk endpoint) to fetch many widgets at once.
	async bulkGet(ids: string[]): Promise<Widget[]> {
		return this.http.post<Widget[]>("/v2/widgets/bulk", { ids })
	}

	// Calls POST /v2/widgets/bulk/count (v2) to count widgets matching ids.
	async bulkCount(ids: string[]): Promise<number> {
		return this.http.post<number>("/v2/widgets/bulk/count", { ids })
	}
}

export interface Widget {
	readonly id: string
	readonly name: string
}

export interface HttpClient {
	get<T>(path: string): Promise<T>
	post<T>(path: string, body: unknown): Promise<T>
}
