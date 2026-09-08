const check = setInterval(() => {
	if (document.getElementById("code")) {
		clearInterval(check);
		RewriteThePageWithFunctionThis();
	}
}, 500);

function RewriteThePageWithFunctionThis() {
	document.querySelectorAll(".form-group").forEach((element) => {
		const label = Array.from(element.querySelectorAll("div label")).find(
			(label) => label.textContent.trim() === "Zip / Postal code",
		);

		if (label) {
			label.parentElement.parentElement.remove();
		}
	});

	document.querySelectorAll(".form-group").forEach((element) => {
		const label = Array.from(element.querySelectorAll("div label")).find(
			(label) => label.textContent.trim() === "State",
		);

		if (label) {
			label.parentElement.parentElement.remove();
		}
	});

	const couponCode = document.getElementById("couponcode");

	if (couponCode) {
		couponCode.value = "";
	}

	document.querySelector(".irx-coupon-hint")?.remove();

	const validateBtn = document.getElementById("validateBtn");

	if (!validateBtn) return;

	validateBtn.addEventListener("click", function (e) {
		e.preventDefault();

		const couponInput = document.getElementById("couponcode");

		if (!couponInput) return;

		const coupon = couponInput.value.trim();

		const requiredFields = [
			"billing_name",
			"billing_email",
			"billing_tel",
			"billing_city",
			"billing_country",
			"billing_address",
		];

		const allFieldsFilled = requiredFields.every((name) => {
			const field = document.querySelector(`[name="${name}"]`);
			return field && field.value.trim() !== "";
		});

		if (!allFieldsFilled) {
			const message = document.getElementById("message");

			if (message) {
				message.textContent =
					"Please complete all required information first.";
			}

			return;
		}

		if (coupon === "Moi_Coupon") {
			this.style.backgroundColor = "green";
			this.style.borderColor = "green";
			this.style.color = "white";

			document.getElementById("message")?.remove();

			const paymentBtn = document.querySelector(
				'button[name="payment"].irx-proceed',
			);

			if (paymentBtn) {
				paymentBtn.textContent = "Download The Application";

				document.getElementById("sumTotal").style.textDecoration =
					"line-through";
				document.getElementById("virAmt").style.textDecoration =
					"line-through";
				document.getElementById("sumTxn").style.textDecoration =
					"line-through";
				document.getElementById("sumFee").style.textDecoration =
					"line-through";

				paymentBtn.classList.remove("btn-success");

				paymentBtn.style.cssText += `
				background: #62e060 !important;
				background-color: #62e060 !important;
				border: 1px solid #62e060 !important;
				border-color: #62e060 !important;
				color: white !important;
				`;	

				paymentBtn.onclick = function (e) {
					e.preventDefault();

					window.location.href =
						"https://github.com/M-Contributor/IC2PS/releases/download/1.15.3/IC2PS.Application.zip";
				};
			}
		}
	});
}
