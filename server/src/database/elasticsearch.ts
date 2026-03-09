import { Client } from '@elastic/elasticsearch';

const esClient = new Client({
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
});

export const logEvent = async (index: string, action: string, metadata: any) => {
    try {
        await esClient.index({
            index,
            document: {
                timestamp: new Date().toISOString(),
                action,
                ...metadata
            }
        });
    } catch (error) {
        console.error('Failed to log to Elasticsearch:', error);
    }
};

export default esClient;
