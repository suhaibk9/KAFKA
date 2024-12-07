# Kafka Payment Processing System

## To Run

1. Start Zookeeper:
   ```bash
   bin/zookeeper-server-start.sh config/zookeeper.properties
   ```

2. Start Kafka server:
   ```bash
   bin/kafka-server-start.sh config/server.properties
   ```

3. Create the Kafka topic:
   ```bash
   bin/kafka-topics.sh --create --topic payments --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
   ```

4. Start Kafka producer to send messages to the `payments` topic:
   ```bash
   bin/kafka-console-producer.sh --broker-list localhost:9092 --topic payments
   ```

5. Run the inventory service (entry point):
   ```bash
   npx nodemon inventoryService.js
   ```

