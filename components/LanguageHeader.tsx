import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

interface NavItem {
  label: string;
  id: string;
  active: boolean;
}

const LanguageHeader: React.FC = () => {
	const { t, i18n } = useTranslation();
	const router = useRouter();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("i18nextLng", lng);
	};

	const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);

	useEffect(() => {
	setNavigationItems([
		{ label: t("menu.exchange"), id: "exchange", active: false },
		{ label: t("menu.howto"), id: "howTo", active: false },
		{ label: t("menu.reviews"), id: "reviews", active: false },
		{ label: t("menu.faq"), id: "faq", active: false },
		{ label: t("menu.blog"), id: "blog", active: false },
	]);
	}, [t, i18n.language]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);

	const handleScroll = (id: string) => {
		if (window.location.pathname !== "/") {
		  router.push(`/#${id}`);
		  setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
			  element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		  }, 100);
		} else {
		  const element = document.getElementById(id);
		  if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		  }
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

	useEffect(() => {
		const isBlogPage = router.pathname === "/blog";
		setNavigationItems((prevItems) =>
		  prevItems.map((item) => ({
			...item,
			active: isBlogPage ? false : item.id === "exchange" && router.pathname === "/"
		  })
		))
	  }, [router.pathname]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.language-selector')) {
				setIsLanguageOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'de', name: 'Deutsch' },
		{ code: 'fr', name: 'Français' },
		{ code: 'ru', name: 'Русский' },
		{ code: 'es', name: 'Español' },
		{ code: 'pt', name: 'Português' }
	];

	const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

	return (
		<header className="flex w-full items-center justify-between px-6 py-2 mb-[15px] fixed top-0 z-50 bg-[#e5e7eb]  backdrop-blur" >
			<div className="flex flex-1 justify-between items-center px-3 mx-auto max-w-[1392px]" >
				<div className="flex items-center relative">
					<button onClick={() => router.push('/')} aria-label="Go to home" className="flex items-center">
					  <img src="/icons/logo.png" alt="Logo" style={{maxHeight: "40px",}} />
					</button>
				</div>

				<div className="hidden md:inline-flex items-center gap-12 relative flex-[0_0_auto] ml-auto mr-[19px]">
				<nav className="flex items-center gap-[31px]">
						{navigationItems.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								className={`h-auto p-0 font-normal text-base tracking-[0] transition-all duration-300 leading-normal whitespace-nowrap focus:outline-none ${
									item.active
										? "text-[#2e77da] hover:text-[#2e77da]"
										: "text-black opacity-50 hover:text-[#2e77da] hover:opacity-75"
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
					className="md:hidden ml-auto mr-3 inline-flex items-center justify-center p-2"
					aria-label="Open navigation"
					aria-expanded={isMenuOpen}
					onClick={() => setIsMenuOpen((v) => !v)}
				>
					<div className="flex flex-col gap-1.5">
						<div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
						<div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '' : ''}`}></div>
						<div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
					</div>
				</button>

				{/* Custom language selector */}
				<div className="relative language-selector" style={{ width: "60px" }}>
					<button
						onClick={() => setIsLanguageOpen(!isLanguageOpen)}
						className="w-full text-black px-3 py-1 pr-2  duration-200 flex items-center justify-between"
						aria-haspopup="listbox"
						aria-expanded={isLanguageOpen}
					>
						<span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
						<svg
							className={`w-4 h-4 text-black transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
            
					</button>
					
					{isLanguageOpen && (
						<ul
							role="listbox"
							className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden"
						>
							{languages.map((lang) => (
								<li
									role="option"
									aria-selected={i18n.language === lang.code}
									key={lang.code}
									onClick={() => {
										changeLanguage(lang.code);
										setIsLanguageOpen(false);
									}}
									className={`px-3 py-2 text-sm  cursor-pointer outline-none hover:text-blue-600 transition-colors duration-150 ${
										i18n.language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
									}`}
								>
									{lang.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Mobile dropdown menu (nav items only) */}
			{isMenuOpen && (
				<div className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg overflow-hidden">
					<nav className="flex flex-col items-center p-6 gap-4">
						{navigationItems.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								className={`justify-center h-auto p-0 text-lg font-medium ${
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
