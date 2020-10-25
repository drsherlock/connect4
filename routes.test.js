const request = require('supertest');

const app = require('./app');

describe('testing routes', () => {

	describe('start', () => {
		test('start game', async () => {
			const res = await request(app)
				.post('/api/start')
				.send({});

			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty('token')
			expect(res.body.status).toEqual('READY');
		})
	});

	describe('move', () => {
		test('make move', async () => {
			let res = await request(app)
				.post('/api/start')
				.send({});
			const token = res.body.token;

			res = await request(app)
				.put('/api/move')
				.send({token: token, turn: 'YELLOW', column: "0"});

			expect(res.statusCode).toEqual(200);
			expect(res.body.status).toEqual('VALID');
		});

		test('make move with missing parameter', async () => {
			let res = await request(app)
				.post('/api/start')
				.send({});
			const token = res.body.token;

			res = await request(app)
				.put('/api/move')
				.send({token: token, turn: 'YELLOW'});

			expect(res.statusCode).toEqual(400);
			expect(res.body.status).toEqual('INVALID');
			expect(res.body.error).toEqual('Missing parameters');
		});

		test('make move with invalid token', async () => {
			let res = await request(app)
				.post('/api/start')
				.send({});
			const token = res.body.token;

			res = await request(app)
				.put('/api/move')
				.send({token: "invalid-token", turn: 'YELLOW', column: "0"});

			expect(res.statusCode).toEqual(401);
			expect(res.body.status).toEqual('INVALID');
			expect(res.body.error).toEqual('Invalid token');
		});
	});
})