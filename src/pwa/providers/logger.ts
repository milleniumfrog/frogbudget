import { LogUpTs, LogUpTsOptions } from 'logupts';


class eLogUpTs extends LogUpTs {

	constructor(options: LogUpTsOptions = {}) {
		options.placeholders = [
			{
				keys: ["{{timestamp}}"],
				flags: "gi",
				replacer: () => {
					let date = new Date();
					return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
				}
			},
			{
				keys: ["{{service}}"],
				flags: "gi",
				replacer: (str?: string, passArgs?: any) => {
					if(!passArgs)
						return "error_service";
					return  `${passArgs.service}`
				}
			}
		]
		super(options);
	}

	async construct(component: string) {
		this.internals.service = "CONSTRUCTOR"
		return this.custom(this.options, this.internals, `Component ${component}`);
	}
}

export const dblogger = new eLogUpTs({prefix: "{{timestamp}} [DB -- {{service}}] "});
export const reduxlogger = new eLogUpTs({prefix: "{{timestamp}} [REDUX -- {{service}}] "});
export const logger = new eLogUpTs({prefix: "{{timestamp}} [{{service}}] "});