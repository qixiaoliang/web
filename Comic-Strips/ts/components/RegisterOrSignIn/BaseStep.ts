import React from 'react';

export type Props = {
	valid: ( index: number ) => void;
	completed: ( index: number, result: object ) => void;
	next: boolean;
	step: number;
	inValid: ( index: number ) => void;
	value: {
		[ key: string ]: any;
	}
}

abstract class BaseStep<T, S={}> extends React.Component<Props & T, S>{
	static defaultProps = {
		next: false
	}
	abstract nextStep(): void;

	componentWillReceiveProps( nextProps: Readonly<T & Props>, nextContext: any ) {
		if ( nextProps.next ) {
			this.nextStep();
		}
	}
}

export default BaseStep;