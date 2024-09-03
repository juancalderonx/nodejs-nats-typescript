import {connect, StringCodec} from 'nats';

const main = async () => {
    const nc = await connect({ servers: 'nats://localhost:4222' });

    console.log('Connected to NATS as SUBSCRIBER');
    console.log(`Process ID is: ${process.pid}`);

    const sub = nc.subscribe('foo');
    const sc = StringCodec();

    for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }

    console.log('Subscription closed');
}

main().then(() => {
    console.log('Published message');
    process.exit();
}).catch((err) => {
    console.error(err);
    process.exit();
});