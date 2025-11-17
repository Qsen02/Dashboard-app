import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryStateProps {
	hasError: boolean;
	message?: string;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryStateProps
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(err: unknown) {
		if (err instanceof Error) {
			return {
				hasError: true,
				message: err.message,
			};
		}else{
            return {
                hasError:true,
                message:"Error occurd!"
            }
        }
	}

    render() {
        if(this.state.hasError){
            return (
                <div className="errorMessage">
                    <h2>An error occurd!</h2>
                    <p>Please return to <a href="/">Home</a></p>
                </div>
            )
        }

        return this.props.children;
    }
}
