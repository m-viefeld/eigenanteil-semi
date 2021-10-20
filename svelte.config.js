import node from "@sveltejs/adapter-node"

export default {
	kit: {
		adapter: node(),
		vite: {
			ssr: {
				noExternal: [ "chart.js" ]
			},
			build: {
				chunkSizeWarningLimit: 2000
			}
		}
	}
}
