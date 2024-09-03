import {connect, StringCodec} from 'nats';

const main = async () => {
    const nc = await connect({ servers: 'nats://localhost:4222' });

    console.log('Connected to NATS as PUBLISHER');

    const sc = StringCodec();

    nc.publish('foo', sc.encode('¡Darwin Evolution!'));

    await nc.drain();
}

main().then(() => {
    console.log('Published message');
    process.exit();
}).catch((err) => {
    console.error(err);
    process.exit();
});