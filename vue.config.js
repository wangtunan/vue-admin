const path = require('path')
const express = require('express')
const app = express()
app.use('/api', express.Router())

// mock数据
const login = require('./mock/login.json')

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	outputDir: 'dist',
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'api': resolve('src/api'),
				'assets': resolve('src/assets'),
				'base': resolve('src/base'),
				'components': resolve('src/components'),
				'utils': resolve('src/utils')
			}
		}
	},
	devServer: {
		port: 4400,
		proxy: {
			'/api': {
				target: 'http://localhost:4400/mock',
				ws: true,
				changeOrigin: true
			}
		},
		before(app) {
			app.post('/api/login', (req, res) => {
				res.json(login)
			})
		}
	},
	lintOnSave: true
}