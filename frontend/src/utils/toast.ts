import Toast from "typescript-toastify";
import { ToastType } from "typescript-toastify/lib/type/type";

export function showToast(toastMsg: string, type: ToastType) {
	new Toast({
		position: "top-right",
		toastMsg,
		autoCloseTime: 3000,
		canClose: true,
		showProgress: true,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		type,
		theme: "dark",
	});
}
