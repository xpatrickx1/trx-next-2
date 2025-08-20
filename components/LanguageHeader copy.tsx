import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from '../components/ThemeContext';
import { Button } from "../components/ui/button";


const LanguageHeader: React.FC = () => {
	const { i18n } = useTranslation();
	const { theme } = useTheme();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("i18nextLng", lng);
	};

	const [navigationItems, setNavigationItems] = useState<NavItem[]>([
		{ label: "Exchange", id: "exchange", active: true },
		{ label: "How To", id: "how-to", active: false },
		{ label: "Reviews", id: "reviews", active: false },
		{ label: "FAQ", id: "faq", active: false },
		{ label: "Blog", id: "blog", active: false },
	]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleScroll = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setIsMenuOpen(false);
	};

	const updateActiveItem = useCallback(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setNavigationItems((prevItems) =>
							prevItems.map((item) => ({
								...item,
								active: item.id === entry.target.id,
							}))
						);
					}
				});
			},
			{ threshold: 0.5 }
		);

		navigationItems.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			navigationItems.forEach((item) => {
				const element = document.getElementById(item.id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, [navigationItems]);

	useEffect(() => {
		const cleanup = updateActiveItem();
		return cleanup;
	}, [updateActiveItem]);


	return (
		<header className="flex w-full items-center justify-between px-6 py-2 mb-[15px] fixed top-0 z-50  backdrop-blur" >
			<div className="flex flex-1 justify-between items-center px-3 mx-auto max-w-[1392px]" >
				<div className="flex items-center relative">
					<img src="icons/logo.png" alt="Logo" style={{maxHeight: "40px",}} />
				</div>

				<div className="hidden md:inline-flex items-center gap-12 relative flex-[0_0_auto] ml-auto mr-[19px]">
				<nav className="flex items-center gap-[31px]">
						{navigationItems.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								className={`h-auto p-0 font-normal text-base tracking-[0] leading-normal whitespace-nowrap ${
									item.active
										? "text-[#2e77da] hover:text-[#2e77da]"
										: "text-black opacity-50 hover:text-[#c1c1c1] hover:opacity-75"
								}`}
								onClick={() => handleScroll(item.id)}
							>
								{item.label}
							</Button>
						))}
					</nav>
				</div>

				{/* Burger button visible on mobile/tablet */}
				<button
					className="md:hidden ml-auto mr-3 inline-flex items-center justify-center p-2 rounded border border-gray-300"
					aria-label="Open navigation"
					aria-expanded={isMenuOpen}
					onClick={() => setIsMenuOpen((v) => !v)}
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
						<line x1="3" y1="6" x2="21" y2="6" />
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>

				<div className="relative" style={{ width: "60px" }}>
					<select
						id="language-select"
						value={i18n.language}
						onChange={(e) => changeLanguage(e.target.value)}
						className="text-black px-3 py-1 pr-10 rounded appearance-none"
						style={{ width: "100%" }}
					>
						<option value="en">en</option>
						<option value="de">de</option>
						<option value="fr">fr</option>
						<option value="ru">ru</option>
						<option value="es">es</option>
						<option value="pt">pt</option>
					</select>
					<div
						className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
						style={{ top: "4px" }}
					>
						<svg
							className="w-4 h-4 text-black"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow">
					<nav className="flex flex-col p-4 gap-3">
						{navigationItems.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								className={`justify-start h-auto p-0 text-base ${
									item.active ? "text-[#2e77da]" : "text-black opacity-70"
								}`}
								onClick={() => handleScroll(item.id)}
							>
								{item.label}
							</Button>
						))}
					</nav>
				</div>
			)}
		</header>
	);
};

export default LanguageHeader;
